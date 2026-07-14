'use client';

import Form from 'next/form';

const BlogFilterForm = ({ defaultValue }: { defaultValue?: string }) => {
  return (
    <Form
      className="mb-4"
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
      <input
        type="text"
        name="filter"
        defaultValue={defaultValue}
        className="px-2 py-1 border rounded"
      />
      <button
        type="submit"
        className="px-3 py-1 ml-2 rounded bg-gray-800 text-white hover:bg-gray-700"
      >
        filter
      </button>
    </Form>
  );
};

export default BlogFilterForm;
