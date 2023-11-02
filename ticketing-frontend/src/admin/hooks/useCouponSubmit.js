import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SidebarContext } from '../context/SidebarContext';
import { notifyError, notifySuccess } from '../utils/toast';

const useCouponSubmit = (id) => {
  const [imageUrl, setImageUrl] = useState('');
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!imageUrl) {
      notifyError('Icon is required!');
      return;
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue('title');
      setValue('productType');
      setValue('couponCode');
      setValue('endTime');
      setValue('discountPercentage');
      setValue('minimumAmount');
      setImageUrl('');
      clearErrors('title');
      clearErrors('productType');
      clearErrors('couponCode');
      clearErrors('endTime');
      clearErrors('discountPercentage');
      clearErrors('minimumAmount');
      return;
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen]);
  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setImageUrl,
    imageUrl,
  };
};

export default useCouponSubmit;
