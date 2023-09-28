import { VerticalSpace } from 'components/space/vertical-space';
import { TypeWrapper } from 'components/form/type/type-wrapper';
import { ReactNode } from 'react';

export const TypesWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <VerticalSpace>
      <TypeWrapper fieldLength={0} field={{ name: 0 }} onRemove={() => undefined}>
        {children}
      </TypeWrapper>
    </VerticalSpace>
  );
};
