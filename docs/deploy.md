# 🚀 Déploiement sur un VPS avec GitHub Actions

Ce projet utilise GitHub Actions pour automatiser le déploiement de l'application sur un serveur VPS à chaque mise à jour de la branche master.

## 🔧 Configuration préalable

Avant d'utiliser ce workflow, il faut générer les clés SSH sur le serveur VPS et configurer les secrets suivants dans le dépôt GitHub :

| Secret GitHub | Description |
|---------------|-------------|
| `VPS_SSH_KEY` | Clé SSH privée permettant à GitHub de se connecter au VPS |
| `VPS_HOST` | Adresse IP ou nom de domaine du VPS |
| `VPS_USER` | Utilisateur SSH sur le VPS |

> **📌 Important :** La clé publique SSH correspondante doit être ajoutée dans `~/.ssh/authorized_keys` du VPS.

## 📝 Détail des étapes

### 1. Déclencheurs

Le workflow s'exécute automatiquement :
- Lors d'un push sur la branche `master`
- Lors d'une pull request vers `master`

### 2. Job deploy

S'exécute sur une machine GitHub avec `ubuntu-latest`.

#### Étape : Checkout du code

```yaml
- name: Checkout code
  uses: actions/checkout@v3
```

Clone le dépôt dans l'environnement d'exécution GitHub Actions.

#### Étape : Configuration SSH

```yaml
- name: Setup SSH
  run: |
    mkdir -p ~/.ssh
    echo "${{ secrets.VPS_SSH_KEY }}" > ~/.ssh/github_deploy
    chmod 600 ~/.ssh/github_deploy
    ssh-keyscan -H ${{ secrets.VPS_HOST }} >> ~/.ssh/known_hosts
```

- Crée le dossier SSH
- Écrit la clé privée dans un fichier sécurisé
- Applique les bonnes permissions
- Ajoute l'hôte du VPS aux hôtes connus pour éviter les erreurs de vérification

#### Étape : Connexion et déploiement Docker

```yaml
- name: Pull and restart Docker
  run: |
    ssh -i ~/.ssh/github_deploy ${{ secrets.VPS_USER }}@${{ secrets.VPS_HOST }} << 'EOF'
      cd /var/www/fake-store-app
      git pull origin master
      docker compose down
      docker compose up -d --build
    EOF
```

- Se connecte au VPS via SSH
- Se place dans le dossier de l'application
- Met à jour le code (`git pull`)
- Redémarre les conteneurs Docker avec reconstruction (`--build`)

## ✅ Résultat

Chaque modification de la branche `master` déclenche automatiquement un déploiement de l'application sur le VPS, sans intervention manuelle. Le détail de ces actions peuvent être retrouvés dans l'onglet Actions de GitHub.
