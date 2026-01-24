$ErrorActionPreference = 'Stop'

Write-Host 'Running yarn compile...'
yarn compile

Write-Host 'Running yarn build-storybook...'
yarn build-storybook
