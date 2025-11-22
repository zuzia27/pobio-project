export const getContentMode = () => {
  const loginMode = localStorage.getItem('loginMode');
  return loginMode === 'true' ? 'login' : 'registration';
};

