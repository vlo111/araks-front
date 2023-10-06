import { useEffect, useMemo } from 'react';
import { Form } from 'antd';
import { useAuth } from 'context/auth-context';
import { useUpdateProfile } from 'api/profile/use-update-profile';
import { ProfileForm } from 'types/auth';
import { EditProfileItems } from './items';

export const EditProfile = () => {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const userInfo = useMemo(
    () => ({
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      bio: user?.bio,
    }),
    [user?.bio, user?.email, user?.first_name, user?.last_name]
  );

  const { mutate: updateProfile } = useUpdateProfile();

  useEffect(() => {
    form.setFieldsValue(userInfo);
  }, [form, userInfo]);

  const onFinish = (values: ProfileForm) => {
    updateProfile({
      ...values,
    });
  };

  return (
    <Form form={form} onFinish={onFinish} autoComplete="off" layout="vertical" requiredMark={false}>
      <EditProfileItems userInfo={userInfo} />
    </Form>
  );
};
