import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SidebarContext } from '../context/SidebarContext';
import { notifyError, notifySuccess } from '../utils/toast';

const useProductSubmit = (id) => {
  const [imageUrl, setImageUrl] = useState('');
  const [children, setChildren] = useState('');
  const [tag, setTag] = useState([]);
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!imageUrl) {
      notifyError('Image is required!');
      return;
    }
    if (data.originalPrice < data.salePrice) {
      notifyError('SalePrice must be less then or equal of product price!');
      return;
    }

    const productData = {
      category: data.category,
      productName: data.productName,
      Status: data.Status,
      Stock: data.Stock,
      isRequiredShipping: data.isRequiredShipping,
      packagingSpecification: data.packagingSpecification,
      published: data.published,
      tags: data.tags,
      variantGrams: data.variantGrams,
      variantPrice: data.variantPrice,
      variantTaxable: data.variantTaxable,
      vendor: data.vendor,
      productDetails: data.productDetails,
      images: imageUrl,
      tag: JSON.stringify(tag),
    };

    
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue('sku');
      setValue('title');
      setValue('slug');
      setValue('description');
      setValue('parent');
      setValue('children');
      setValue('type');
      setValue('unit');
      setValue('quantity');
      setValue('originalPrice');
      setValue('salePrice');
      setImageUrl('');
      setChildren('');
      setTag([]);
      clearErrors('sku');
      clearErrors('title');
      clearErrors('slug');
      clearErrors('description');
      clearErrors('parent');
      clearErrors('children');
      clearErrors('type');
      clearErrors('unit');
      clearErrors('quantity');
      clearErrors('originalPrice');
      clearErrors('salePrice');
      clearErrors('tax1');
      clearErrors('tax2');
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen]);

  useEffect(() => {
    setChildren(watch('children'));
  }, [watch, children]);

  return {
    register,
    watch,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    tag,
    setTag,
  };
};

export default useProductSubmit;
