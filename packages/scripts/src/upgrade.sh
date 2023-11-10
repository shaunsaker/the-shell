#!/bin/bash

# Check if a remote branch was passed as an argument
if [ $# -lt 1 ]; then
  echo "Usage: $0 'remote/branch'"
  exit 1
fi

# The argument is the remote branch
REMOTE_BRANCH="$1"

# Fetch the latest changes from the remote
git fetch $(echo $REMOTE_BRANCH | cut -d '/' -f 1)

# Get commit messages from the current branch
CURRENT_BRANCH_COMMITS=$(git log --format="%s")

# Initialize an array to hold the commit hashes for cherry-picking
declare -a commits_to_pick

# Compare and gather commit hashes from the remote branch
# that are not in the current branch and do not contain "custom" in their message
while IFS= read -r line; do
  commit_hash=$(echo $line | awk '{print $1}')
  commit_message=$(echo $line | cut -d ' ' -f 2-)

  if echo "$CURRENT_BRANCH_COMMITS" | grep -Fxq "$commit_message"; then
    continue
  elif [[ "$commit_message" != *"custom"* ]]; then
    commits_to_pick+=("$commit_hash - $commit_message")
  fi
done < <(git log "$REMOTE_BRANCH" --format="%H %s")

# Log the commit hashes and messages to be cherry-picked
echo "Commits to be cherry-picked from $REMOTE_BRANCH:"
for commit in "${commits_to_pick[@]}"; do
  echo "$commit"
done

# Ask for user confirmation before cherry-picking
read -p "Do you want to proceed with cherry-picking these commits? (yes/no) " confirmation
if [[ "$confirmation" != "yes" ]]; then
  echo "Cherry-picking aborted."
  exit 0
fi

# Reverse the order of commits for cherry-picking
for ((idx = ${#commits_to_pick[@]} - 1; idx >= 0; idx--)); do
  git cherry-pick "$(echo "${commits_to_pick[idx]}" | cut -d ' ' -f 1)"
done
