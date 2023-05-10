const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/;

export const rulesPassword = [
  { required: true, message: 'The password is required' },
  { min: 9, message: 'The minimum length for this field is 9 characters' },
  { max: 16, message: 'The maximum length for this field is 16 characters' },
  {
    pattern: passwordRegExp,
    message: 'Password must contain at least one uppercase character, one lowercase character and one digit ',
  },
  ({ getFieldValue }: { getFieldValue: (name: string) => string }) => ({
    async validator(_: { field: string }, value: string) {
      if (
        _.field === 'old_password' ||
        getFieldValue(_.field === 'new_password' ? 'confirm_password' : 'new_password') === value
      ) {
        return await Promise.resolve();
      }
      throw new Error('The two passwords that you entered do not match!');
    },
  }),
];

export const rulesInput = [
  { required: true, message: 'The field is required' },
  { min: 3, message: 'The minimum length for this field is 3 characters' },
  { max: 30, message: 'The maximum length for this field is 30 characters' },
];
