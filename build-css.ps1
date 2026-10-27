# Régénère styles.css et ré-injecte le CSS dans index.html (inline anti render-blocking).
$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$cli = Join-Path $root 'tailwindcss.exe'
if (-not (Test-Path $cli)) {
  $url = 'https://github.com/tailwindlabs/tailwindcss/releases/download/v3.4.17/tailwindcss-windows-x64.exe'
  Write-Host "Téléchargement de Tailwind CLI..."
  Invoke-WebRequest -Uri $url -OutFile $cli
}
Push-Location $root
try {
  & $cli -i ./input.css -o ./styles.css --minify
  $htmlPath = Join-Path $root 'index.html'
  $html = [System.IO.File]::ReadAllText($htmlPath)
  $css = [System.IO.File]::ReadAllText((Join-Path $root 'styles.css')).Trim()
  if ($html -notmatch 'id="tw"') { throw 'Balise <style id="tw"> introuvable dans index.html' }
  $updated = [regex]::Replace($html, '(?s)(<style id="tw">).*?(</style>)', { param($m) $m.Groups[1].Value + $css + $m.Groups[2].Value }, 1)
  [System.IO.File]::WriteAllText($htmlPath, $updated)
  Write-Host "OK → styles.css + index.html (CSS inline)"
} finally {
  Pop-Location
}
