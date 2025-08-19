# Instructions de téléchargement

## Pour récupérer ce projet sur votre machine locale :

### Méthode 1: Copie manuelle
1. Créez un nouveau dossier `noe-plantier-portfolio` sur votre machine
2. Copiez tous les fichiers de ce projet Bolt dans votre dossier local
3. Ouvrez un terminal dans le dossier et exécutez :
   ```bash
   npm install
   npm run dev
   ```

### Méthode 2: Depuis GitHub
1. Créez un nouveau repository sur GitHub
2. Uploadez tous ces fichiers dans votre repository
3. Clonez le repository sur votre machine :
   ```bash
   git clone https://github.com/votre-username/noe-plantier-portfolio.git
   cd noe-plantier-portfolio
   npm install
   npm run dev
   ```

### Méthode 3: Zip download
Si Bolt propose une option de téléchargement, utilisez-la pour télécharger tous les fichiers en une fois.

## Structure complète à recréer :

```
noe-plantier-portfolio/
├── package.json
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── postcss.config.js
├── README.md
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    └── components/
        ├── Hero.tsx
        ├── Skills.tsx
        ├── Projects.tsx
        ├── Contact.tsx
        └── ParticleBackground.tsx
```

## Commandes utiles :

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Prévisualisation du build

Une fois le projet sur votre machine, vous pourrez l'ouvrir avec votre IDE préféré (VS Code, WebStorm, etc.) et le modifier comme vous le souhaitez !