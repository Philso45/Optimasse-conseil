# Régénère styles.css à partir des classes utilisées dans le HTML/JS.
# Prérequis : CLI Tailwind (one-shot) — téléchargée si absente.
$ErrorActionPreference = 'Stop'
$cli = Join-Path $PSScriptRoot 'tailwindcss.exe'
if (-not (Test-Path $cli)) {
  $url = 'https://github.com/tailwindlabs/tailwindcss/releases/download/v3.4.17/tailwindcss-windows-x64.exe'
  Write-Host "Téléchargement de Tailwind CLI..."
  Invoke-WebRequest -Uri $url -OutFile $cli
}
& $cli -i ./input.css -o ./styles.css --minify
Write-Host "OK → styles.css"
