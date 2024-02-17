// Function to reformat the data
export function getGroups(data) {
  return data.map(groupData => {
    const group = groupData.group;
    const projectName = group.object.name;
    const members = group.members.map(member => member.user.login);
    const auditors = group.auditors.map(auditor => ({
      name: auditor.auditor.login,
      grade: auditor.grade.toString(),
    }));

    return {
      projectName,
      members,
      auditors,
    };
  });
}

export function countInteractions(data, userLogin) {
  const interactionCount = {};

  // Helper function to update interaction count for a user
  function updateCount(user) {
    if (!interactionCount[user]) {
      interactionCount[user] = 1;
    } else {
      interactionCount[user]++;
    }
  }

  // Count interactions for group members
  data.forEach(groupData => {
    groupData.members.forEach(member => member != userLogin.login && updateCount(member));
  });

  // Count interactions for auditors
  data.forEach(groupData => {
    groupData.auditors.forEach(auditor => auditor.name != userLogin.login && updateCount(auditor.name));
  });

  // Sort users by interaction count in descending order
  const sortedInteractions = Object.entries(interactionCount)
    .sort(([, countA], [, countB]) => countB - countA)
    .reduce((sortedObj, [key, value]) => ({ ...sortedObj, [key]: value }), {});

  return sortedInteractions;
}

export function getXPS(data, total) {
  return data.filter(p => p.path.split("/")[3] != "checkpoint").map(project => ({
    name: getResourceFromPath(project.path),
    score: ((project.amount * 100) / total).toFixed(2),
  }))
}

function getResourceFromPath(path) {
  // Split the path by '/'
  const pathParts = path.split('/');

  // Get the last part (resource)
  const resource = pathParts[pathParts.length - 1];

  return resource;
}
