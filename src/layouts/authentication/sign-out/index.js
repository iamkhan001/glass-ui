import logout from 'utils/session'
import { Redirect } from 'react-router-dom'

function SignOut() {

  logout();

  console.log(`clear storage:`)
  return (
    <Redirect to='/authentication/sign-in'  />
  );
}

export default SignOut;
