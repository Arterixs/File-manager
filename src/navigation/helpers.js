export const createObjectFiles = async (item) => {
  const type = item.isDirectory() ? 'directory' : 'file';
  return { Name: item.name, Type: type };
};

export const sortedObjectFiles = (a, b) =>
  a.Type.localeCompare(b.Type) ||
  a.Name.toLowerCase().localeCompare(b.Name.toLowerCase());
