const myTheme = {
  // Alert
  alert: {
    base: 'p-4 pl-12 relative rounded-lg leading-5',
    withClose: 'pr-12',
    success: 'bg-green-50 text-green-900',
    danger: 'bg-red-50 text-red-900',
    warning: 'bg-yellow-50 text-yellow-900',
    neutral: 'bg-gray-50 text-gray-800',
    info: 'bg-blue-50 text-blue-900',
    icon: {
      base: 'h-5 w-5',
      success: 'text-green-400',
      danger: 'text-red-400',
      warning: 'text-yellow-400',
      neutral: 'text-gray-400',
      info: 'text-blue-400',
    },
  },
  // Pagination
  pagination: {
    base: 'flex flex-col justify-between text-xs sm:flex-row text-gray-600',
  },
  // TableFooter
  tableFooter: {
    base: 'px-4 py-3 border-t border-gray-200 bg-white text-gray-500',
  },
  // TableRow
  tableRow: {
    base: '',
  },
  // TableHeader
  tableHeader: {
    base: 'text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-100',
  },
  // TableContainer
  tableContainer: {
    base: 'w-full overflow-hidden border border-gray-200 rounded-lg ring-1 ring-black ring-opacity-5',
  },
  // TableCell
  tableCell: {
    base: 'px-4 py-3',
  },
  // TableBody
  tableBody: {
    base: 'bg-white divide-y divide-gray-100 text-gray-700',
  },
  // DropdownItem
  // this is the <li> that lives inside the Dropdown <ul>
  // you're probably looking for the dropdownItem style inside button
  dropdownItem: {
    base: 'mb-2 last:mb-0',
  },
  // Dropdown
  dropdown: {
    base: 'absolute w-56 p-2 mt-2 text-gray-600 bg-white border border-gray-100 rounded-lg shadow-md min-w-max-content',
    align: {
      left: 'left-0',
      right: 'right-0',
    },
  },
  // Avatar
  avatar: {
    base: 'relative rounded-full inline-block',
    size: {
      large: 'w-10 h-10',
      regular: 'w-8 h-8',
      small: 'w-6 h-6',
    },
  },
  // Modal
  modal: {
    base: 'w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg sm:rounded-lg sm:m-4 sm:max-w-xl custom-modal',
  },
  // ModalBody
  modalBody: {
    base: 'mb-6 text-sm text-gray-700',
  },
  // ModalFooter
  modalFooter: {
    base: 'flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-3 sm:space-y-0 sm:space-x-4 sm:flex-row bg-gray-50',
  },
  // ModalHeader
  modalHeader: {
    base: 'mt-4 mb-2 text-lg font-semibold text-gray-700',
  },
  // Badge
  badge: {
    base: 'inline-flex px-2 text-xs font-medium leading-5 rounded-full',
    success:
      'text-green-500 bg-green-100',
    danger: 'text-red-500 bg-red-100',
    warning: 'text-yellow-500 bg-yellow-100',
    neutral: 'text-gray-500 bg-gray-100',
    primary: 'text-blue-500 bg-blue-100',
  },
  // Backdrop
  backdrop: {
    base: 'fixed inset-0 z-40 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center',
  },
  // Textarea
  textarea: {
    base: 'block w-full text-sm rounded-md focus:outline-none form-textarea',
    active:
      'focus:border-purple-400 border-gray-300 focus:ring focus:ring-purple-300',
    disabled: 'cursor-not-allowed opacity-50 bg-gray-300',
    valid:
      'border-green-600 focus:border-green-400 focus:ring focus:ring-green-200',
    invalid:
      'border-red-600 focus:border-red-400 focus:ring focus:ring-red-200',
  },
  // Select
  select: {
    base: 'block w-full px-2 py-1 text-sm focus:outline-none rounded-md form-select',
    active:
      'focus:border-gray-200 border-gray-200 focus:shadow-none focus:ring focus:ring-green-300',
    select: 'leading-5',
    disabled: 'cursor-not-allowed opacity-50 bg-gray-300',
    valid:
      'border-green-600 focus:border-green-400 focus:ring focus:ring-green-200',
    invalid:
      'border-red-600 focus:ring focus:ring-red-200',
  },
  // Label
  label: {
    base: 'block text-sm text-gray-700',
    // check and radio get this same style
    check: 'inline-flex items-center',
    disabled: 'opacity-50 cursor-not-allowed',
  },
  // Input
  input: {
    base: 'block w-full px-3 py-1 text-sm focus:outline-none leading-5 rounded-md',
    active:
      'focus:border-gray-200 border-gray-200 focus:ring focus:ring-green-300',
    disabled: 'cursor-not-allowed opacity-50 bg-gray-300',
    valid:
      'border-green-600 focus:border-green-400 focus:ring focus:ring-green-200',
    invalid:
      'border-red-600 focus:border-red-400 focus:ring focus:ring-red-200',
    radio:
      'text-green-500 form-radio focus:border-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-offset-0',
    checkbox:
      'text-green-500 form-checkbox focus:border-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-offset-0 rounded',
  },
  // HelperText
  helperText: {
    base: 'text-xs',
    valid: 'text-green-600',
    invalid: 'text-red-600',
  },
  // Card
  card: {
    base: 'min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden',
    default: 'bg-white',
  },
  cardBody: {
    base: 'p-4',
  },
  // Button
  button: {
    base: 'align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none',
    block: 'w-full',
    size: {
      larger: 'px-10 py-4 rounded-lg',
      large: 'px-5 py-3 rounded-lg',
      regular: 'px-4 py-2 rounded-lg text-sm',
      small: 'px-3 py-1 rounded-md text-sm',
      icon: {
        larger: 'p-4 rounded-lg',
        large: 'p-3 rounded-lg',
        regular: 'p-2 rounded-lg',
        small: 'p-2 rounded-md',
      },
      pagination: 'px-3 py-1 rounded-md text-xs',
    },
    // styles applied to the SVG icon
    icon: {
      larger: 'h-5 w-5',
      large: 'h-5 w-5',
      regular: 'h-5 w-5',
      small: 'h-3 w-3',
      left: 'mr-2 -ml-1',
      right: 'ml-2 -mr-1',
    },
    primary: {
      base: 'text-white bg-green-500 border border-transparent',
      active:
        'active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300',
      disabled: 'opacity-50 cursor-not-allowed',
    },
    outline: {
      base: 'text-gray-600 border-gray-200 border focus:outline-none',
      active:
        'rounded-lg border border-gray-200 px-4 w-full mr-3 flex items-center justify-center cursor-pointer h-12 bg-gray-200',
      disabled: 'opacity-50 cursor-not-allowed bg-gray-300',
    },
    link: {
      base: 'text-gray-600 focus:outline-none border border-transparent',
      active:
        'active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300',
      disabled: 'opacity-50 cursor-not-allowed',
    },
    // this is the button that lives inside the DropdownItem
    dropdownItem: {
      base: 'inline-flex items-center cursor-pointer w-full px-2 py-1 text-sm font-medium transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800',
    },
  },
};
export default myTheme;
