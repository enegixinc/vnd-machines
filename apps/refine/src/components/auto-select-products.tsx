import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { SelectProps } from 'antd';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { vndClient } from '@providers/api';

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
  disableOptions?: boolean;
  selectAllOption?: {
    label: string;
    value: string;
  };
}

function DebounceSelect<
  ValueType extends {
    key?: string;
    label: React.ReactNode;
    value: string | number;
  } = any
>({
  fetchOptions,
  debounceTimeout = 500,
  disableOptions,
  selectAllOption,
  ...props
}: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  // initial fetch
  useEffect(() => {
    debounceFetcher(' ');
  }, []);

  useEffect(() => {
    if (disableOptions) {
      setOptions((prevState) => {
        return prevState.map((option, index) => {
          if (option.value === selectAllOption?.value) {
            return option;
          }
          return {
            ...option,
            disabled: true,
          };
        });
      });
    } else {
      setOptions((prevState) => {
        return prevState.map((option, index) => {
          if (option.value === selectAllOption?.value) {
            return option;
          }
          return {
            ...option,
            disabled: false,
          };
        });
      });
    }
  }, [disableOptions]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}

interface UserValue {
  label: string;
  value: string;
}

export const AutoSelectProducts = (
  props: Parameters<typeof DebounceSelect>[0] & {
    entity: 'products' | 'machines' | 'users' | 'categories' | 'brands';
    mode?: 'multiple' | 'tags';
    onChange?: (value: { value: string }[]) => void;
  }
) => {
  const { entity, onChange, mode = 'multiple' } = props;
  const capitalizeEntity = entity.charAt(0).toUpperCase() + entity.slice(1);

  const selectAllOption = {
    label: 'Select All',
    value: `All ${capitalizeEntity}`,
  };

  const [value, setValue] = useState<UserValue[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const fetchList = async (search: string): Promise<any[]> =>
    vndClient[entity]
      .getMany({
        fields: ['fullName', 'description'],
        filter: [`searchableText||$contL||${search}`],
      })
      .then(({ data }) =>
        data.map((entity) => ({
          label: entity.fullName,
          value: entity._id,
        }))
      )
      .then((data) => {
        // if machines or products, add a select all option
        if (entity === 'products' || entity === 'machines') {
          data.unshift(selectAllOption);
        }
        return data;
      })
      .catch(() => []);

  // if all is selected, then disable all other options
  useEffect(() => {
    const isValueArray = Array.isArray(value);
    const isAllSelected = isValueArray
      ? value.some((v) => v.value === 'all')
      : value === 'all';

    if (isAllSelected && isValueArray) {
      setValue([selectAllOption]);
    }

    setIsSelectedAll(isAllSelected);
  }, [value]);

  const fetchOptions = async (search: string) => {
    if (isSelectedAll) {
      return [selectAllOption];
    }
    return fetchList(search);
  };

  return (
    <DebounceSelect
      {...props}
      value={value}
      selectAllOption={selectAllOption}
      disableOptions={isSelectedAll}
      placeholder={`Select ${entity}`}
      size={'large'}
      fetchOptions={fetchOptions}
      onChange={(newValue, option) => {
        setValue(newValue as UserValue[]);
        onChange && onChange(newValue, option);
      }}
      style={{ width: '100%' }}
    />
  );
};
