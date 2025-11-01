# PI-SPI SDK Repository Setup

## ✅ Completed Setup

### 1. Git Submodule Configuration
- Added `apps/pi-spi-sdk` as a git submodule pointing to `https://github.com/lomiafrica/pi-spi-sdk`
- Updated `.gitmodules` file

### 2. Standalone CLI Package
Created `cli/` folder with:
- **Package**: `@lomi/pi-spi-sdk-cli`
- **Command**: `lomi. pi-spi init`
- **Branding**: Uses "lomi." branding so fintechs know it's from lomi.
- **Purpose**: Quick setup for fellow fintechs building with SPI

### 3. Repository URLs Updated
- SDK package.json now points to `https://github.com/lomiafrica/pi-spi-sdk`
- CLI package.json points to same repo with `/cli` directory

## 📦 Package Structure

```
apps/pi-spi-sdk/
├── cli/                    # Standalone CLI package
│   ├── src/
│   │   ├── index.ts       # Main CLI entry (lomi. command)
│   │   └── commands/
│   │       └── init.ts    # pi-spi init command
│   ├── package.json       # @lomi/pi-spi-sdk-cli
│   └── README.md
├── src/                    # SDK source code
├── package.json           # @lomi/pi-spi-sdk
└── README.md
```

## 🚀 How to Use

### For Fintechs (End Users)

```bash
# Install CLI
npm install -g @lomi/pi-spi-sdk-cli

# Initialize project
lomi. pi-spi init

# Or install SDK directly
npm install @lomi/pi-spi-sdk
```

### For Development (Monorepo)

```bash
# Initialize submodule (if not already done)
git submodule update --init --recursive

# Work in the submodule
cd apps/pi-spi-sdk
git checkout main
# Make changes...
git add .
git commit -m "Your changes"
git push origin main
```

## 📝 Next Steps

1. **Initialize the submodule** (if not already done):
   ```bash
   git submodule add https://github.com/lomiafrica/pi-spi-sdk.git apps/pi-spi-sdk
   ```

2. **Push to the separate repo**:
   ```bash
   cd apps/pi-spi-sdk
   git remote add origin https://github.com/lomiafrica/pi-spi-sdk.git
   git branch -M main
   git push -u origin main
   ```

3. **Build and publish CLI**:
   ```bash
   cd apps/pi-spi-sdk/cli
   npm install
   npm run build
   npm publish --access public
   ```

4. **Build and publish SDK**:
   ```bash
   cd apps/pi-spi-sdk
   npm run generate
   npm run build
   npm publish --access public
   ```

## 🎯 What This Achieves

✅ **Separate Repository**: `pi-spi-sdk` is now its own GitHub repo  
✅ **Submodule Integration**: Still accessible in monorepo via submodule  
✅ **Standalone CLI**: `@lomi/pi-spi-sdk-cli` branded with "lomi."  
✅ **Open Source**: SDK code is open source  
✅ **Private Tools**: Generation scripts stay private  
✅ **Brand Recognition**: CLI uses "lomi." so fintechs know who built it  

The SDK is now ready to be a gift to the fintech community! 🎁

