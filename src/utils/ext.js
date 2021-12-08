export const getRoleId = (r) => {
    if(r === 'Member') {
      return "U";
    }
    return "A";
  }

export const getRoleName = (r) => {
    if(r === 'U') {
      return "Member";
    }
    return "Admin";
}

export default getRoleName
