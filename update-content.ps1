# Trump Policy Hub - Manual Content Update Script
# Run this script to manually update policy content

param(
    [string]$Category = "all",
    [string]$UpdateSecret = $env:UPDATE_SECRET
)

# Check if UPDATE_SECRET is provided
if (-not $UpdateSecret) {
    $UpdateSecret = Read-Host -Prompt "Enter your UPDATE_SECRET" -AsSecureString
    $UpdateSecret = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($UpdateSecret))
}

# Available categories
$ValidCategories = @("all", "immigration", "maha", "tariffs", "energy", "economy", "foreign", "potpourri")

Write-Host "🚀 Trump Policy Hub - Content Updater" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Validate category
if ($ValidCategories -notcontains $Category) {
    Write-Host "❌ Invalid category. Valid options: $($ValidCategories -join ', ')" -ForegroundColor Red
    exit 1
}

Write-Host "📝 Updating category: $Category" -ForegroundColor Yellow

# Prepare request
$headers = @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer $UpdateSecret"
}

if ($Category -eq "all") {
    # Update all categories
    $categories = @("immigration", "maha", "tariffs", "energy", "economy", "foreign", "potpourri")
    
    foreach ($cat in $categories) {
        Write-Host "🔄 Updating $cat..." -ForegroundColor White
        
        $body = @{ category = $cat } | ConvertTo-Json
        
        try {
            $response = Invoke-RestMethod -Uri "https://trump.riptonic.com/api/update-content" -Method POST -Headers $headers -Body $body
            Write-Host "✅ $cat updated successfully" -ForegroundColor Green
            Write-Host "   Last updated: $($response.timestamp)" -ForegroundColor Gray
        }
        catch {
            Write-Host "❌ Failed to update $cat`: $($_.Exception.Message)" -ForegroundColor Red
        }
        
        Start-Sleep -Seconds 2  # Rate limiting
    }
}
else {
    # Update single category
    $body = @{ category = $Category } | ConvertTo-Json
    
    try {
        Write-Host "🔄 Updating $Category..." -ForegroundColor White
        $response = Invoke-RestMethod -Uri "https://trump.riptonic.com/api/update-content" -Method POST -Headers $headers -Body $body
        Write-Host "✅ $Category updated successfully!" -ForegroundColor Green
        Write-Host "   Last updated: $($response.timestamp)" -ForegroundColor Gray
        Write-Host "   Generated content with $($response.content.perspectives.supportive.Count) supportive points" -ForegroundColor Gray
    }
    catch {
        Write-Host "❌ Update failed: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "🎉 Content update completed!" -ForegroundColor Green
Write-Host "Check your website at: https://trump.riptonic.com" -ForegroundColor Cyan

# Pause to see results
Read-Host -Prompt "Press Enter to continue"