import logout from 'utils/session'

function SignOut() {

  logout();

  console.log(`clear storage:`)
  return (
    <p>Good Bye!</p>
  );
}

export default SignOut;
