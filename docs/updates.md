# Keeping Your Fork Updated with the Original Repository

1. Add the Original Repo as Upstream:

```bash
git remote add upstream https://github.com/epicweb-dev/epic-stack.git
```

2. Fetch Updates from Upstream:

```bash
git fetch upstream
```

3. Merge or Rebase Updates:

- Merge:

```bash
git merge upstream/main
```

- Rebase: Rebase (cleaner history):

```bash
git rebase upstream/main
```

4. Push Updates to Your Fork:

```bash
git push origin main
```

Repeat steps 2-4 regularly to stay updated.
