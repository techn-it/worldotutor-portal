import {UsesAuth} from '../../context/UsesAuth'
export const ValidateAAuth = () => {
  const {user,loading} = UsesAuth();
  return {user,loading}
} 