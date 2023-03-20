import { useState } from 'react';
import { AutoComplete } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd/es/select';
import { Input } from 'components/input';
import styled, { css } from 'styled-components';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export enum SearchPostionTypes {
    left = 'left',
    right = 'right'
}

type Props = {
    position?: SearchPostionTypes;
    icon?: Partial<CustomIconComponentProps>;
}

const Wrapper = styled.div<Props>`
    position:relative;
    width:0px;
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55 );

    .ant-input {
        height: 26px;
    }

    .ant-select-auto-complete {
        opacity:0;
        transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55 );
    }

    .search-btn {
        cursor: pointer;
        font-size: 18px;
        color: #C3C3C3;
        position: absolute;
        top: 5px;
        ${props => props.position === SearchPostionTypes.left ? css`
            left: 0px;
        ` : css`
            right: 0;
        `}
        
        transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55 );
        z-index:2;
    }

    .cancel-btn{
        cursor: pointer;
        font-size: 18px;
        color: #C3C3C3;
        position: absolute;
        top:5px;
        right: 15%;
        opacity:0;
    }

    &.active{
        .ant-select-auto-complete {
            opacity:1;
        }

        .search-btn{
            opacity:0;
        }

        .cancel-btn{
            opacity:1;
            transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55 );
        }
    }
`;

export const SearchAction = ({ position = SearchPostionTypes.left, icon }: Props) => {
    const [options, setOptions] = useState<SelectProps<object>['options']>([]);
    const [isActive, setIsActive] = useState(false);

    const handleSearch = (value: string) => {
      setOptions(value ? [] : []);
    };
  
    const onSelect = (value: string) => {
    };

    return <Wrapper className={`search-box ${isActive ? 'active' : ''}`} style={{ width: '100%' }} position={position}>
        <AutoComplete
            dropdownMatchSelectWidth={252}
            style={{ width: '70%' }}
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
        >
            <Input placeholder="input here" />
        </AutoComplete>
        <SearchOutlined className="search-btn" onClick={() => setIsActive(true)} style={icon?.style}  />
        <CloseOutlined className="cancel-btn" onClick={() => setIsActive(false)} style={icon?.style} />
  </Wrapper>
}