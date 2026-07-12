'use client';

import Form from 'next/form';

const BlogFilterForm = ({ defaultValue }: { defaultValue?: string }) => {
  return (
    <Form
      action=""
      onSubmit={(e) => {
        const input = e.currentTarget.elements.namedItem(
          'filter',
        ) as HTMLInputElement;
        if (!input.value.trim()) {
          input.disabled = true;
          setTimeout(() => {
            input.disabled = false;
          }, 0);
        }
      }}
    >
      <input type="text" name="filter" defaultValue={defaultValue} />
      <button type="submit">filter</button>
    </Form>
  );
};

export default BlogFilterForm;
