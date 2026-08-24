<#
.SYNOPSIS
    Regenerate frenzypenguin-media-site\repos.json (filtered, star-ranked repo
    snapshot). Optionally commit it to the Pages repo (default when run locally).
.USAGE
    powershell -ExecutionPolicy Bypass -File update-snapshot.ps1 [-NoDeploy] [-OutFile <path>]
.NOTES
    CI copy lives at tools/update-snapshot.ps1 in the frenzypenguin-media.github.io
    repo - keep the two in sync (this file is canonical).
#>
[CmdletBinding()]
param(
    [switch]$NoDeploy,
    [string]$OutFile
)
$ErrorActionPreference = "Stop"

$org = gh api "/orgs/frenzypenguin-media/repos?per_page=100" | ConvertFrom-Json
$usr = gh api "/users/neohiro/repos?per_page=100&sort=pushed" | ConvertFrom-Json

$all = @($org) + @($usr) |
    Where-Object { -not $_.fork -and $_.name -notmatch 'github\.io$' -and $_.name -ne '.github' } |
    Sort-Object @{e = 'stargazers_count'; Descending = $true }, @{e = 'pushed_at'; Descending = $true } |
    ForEach-Object {
        [ordered]@{
            name             = $_.name
            html_url         = $_.html_url
            description      = $_.description
            stargazers_count = $_.stargazers_count
            forks_count      = $_.forks_count
            language         = $_.language
            topics           = @($_.topics)
            # date-only: GitHub's pushed_at wobbles across edge caches, which would
            # make CI change-detection noisy; the site only displays the date anyway
            pushed_at        = ($_.pushed_at -replace 'T.*$', '')
        }
    }

$json = ConvertTo-Json @($all) -Depth 4
if ($all.Count -eq 0 -or [string]::IsNullOrWhiteSpace($json)) {
    throw "no repos matched the snapshot filters - refusing to write an empty snapshot"
}
if (-not $OutFile) { $OutFile = Join-Path $PSScriptRoot "frenzypenguin-media-site\repos.json" }
[IO.File]::WriteAllText($OutFile, $json, (New-Object Text.UTF8Encoding($false)))
Write-Host "SNAPSHOT $($all.Count) repos -> $($OutFile)"

if (-not $NoDeploy) {
    . (Join-Path $PSScriptRoot "deploy-site.ps1")
    Deploy-Site -Path $OutFile -Repo "frenzypenguin-media.github.io" -Owner "frenzypenguin-media" `
        -Message "Refresh repos.json snapshot" -DestPath "repos.json"
}
