import { Rule } from 'antd/lib/form';

const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/;

export const rulesPassword: Rule[] = [
  { required: true, message: 'The password is required' },
  { min: 9, message: 'The minimum length for this field is 9 characters' },
  { max: 16, message: 'The maximum length for this field is 16 characters' },
  {
    pattern: passwordRegExp,
    message: 'Password must contain at least one uppercase character, one lowercase character, and one digit',
  },
  ({ getFieldValue }: { getFieldValue: (name: string) => string }) => ({
    async validator(_, value: string) {
      const newPassword = getFieldValue('new_password');
      const confirmNewPassword = getFieldValue('confirm_password');

      if (newPassword && confirmNewPassword && newPassword !== confirmNewPassword) {
        throw new Error('The two passwords that you entered do not match!');
      }
    },
  }),
];

export const rulesInput: Rule[] = [
  { required: true, message: 'The field is required' },
  { min: 3, message: 'The minimum length for this field is 3 characters' },
  { max: 30, message: 'The maximum length for this field is 30 characters' },
];
