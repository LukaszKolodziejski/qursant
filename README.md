# Qursant

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/next?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Finish your CI setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/sd0fbzHJTz)


## Run tasks

To merge:

```sh
git merge develop
git push --force

```
To run the dev server for your app, use:

```sh
npx nx dev qursant
```

To create a production bundle:

```sh
npx nx build qursant
```

To see all available targets to run for a project, run:

```sh
npx nx show project qursant
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/next:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/react:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/next?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Dostępne komendy

### Podstawowe komendy deweloperskie
```bash
# Uruchomienie w trybie deweloperskim
npm run dev

# Zbudowanie projektu
npm run build

# Uruchomienie w trybie produkcyjnym
npm start

# Wyczyszczenie cache i plików tymczasowych
npm run clean
```

### Testowanie i jakość kodu
```bash
# Uruchomienie testów jednostkowych
npm test

# Uruchomienie testów end-to-end
npm run e2e

# Sprawdzenie kodu przez lintera
npm run lint

# Automatyczna naprawa problemów z linterem
npm run lint:fix

# Sprawdzenie typów TypeScript
npm run typecheck

# Formatowanie kodu
npm run format
```

### Analiza projektu
```bash
# Wizualizacja zależności (dostępne też jako npm run dep-graph)
npm run graph

# Analiza bundle'a
npm run analyze
```

### Komendy dla monorepo
```bash
# Sprawdzenie zmodyfikowanych aplikacji
npm run affected:apps

# Sprawdzenie zmodyfikowanych bibliotek
npm run affected:libs

# Zbudowanie zmodyfikowanych elementów
npm run affected:build

# Testy dla zmodyfikowanych elementów
npm run affected:test

# Linting dla zmodyfikowanych elementów
npm run affected:lint

# Graf zależności dla zmodyfikowanych elementów
npm run affected:dep-graph
```

### Komendy administracyjne
```bash
# Aktualizacja zależności NX
npm run update

# Integracja z NX Cloud
npm run nx-cloud

# Generatory workspace'a
npm run workspace-generator
```
