// Admin Dashboard Padding and Spacing Configuration
export const adminPaddingConfig = {
  // Main layout padding
  layout: {
    container: 'px-4 py-8',
    sidebar: 'p-6',
    header: 'px-6 py-4',
    content: 'p-6 lg:p-8',
    mobileHeader: 'px-4 py-3'
  },

  // Card components padding
  cards: {
    default: 'p-6',
    compact: 'p-4',
    large: 'p-8',
    header: 'px-6 py-4',
    content: 'p-6',
    footer: 'px-6 py-4'
  },

  // Form elements padding
  forms: {
    container: 'p-6',
    fieldGroup: 'space-y-4',
    field: 'space-y-2',
    input: 'px-3 py-2',
    button: 'px-4 py-2',
    buttonLarge: 'px-6 py-3',
    buttonSmall: 'px-3 py-1.5'
  },

  // Table padding
  tables: {
    container: 'p-6',
    header: 'px-6 py-4',
    cell: 'px-6 py-4',
    cellCompact: 'px-4 py-3',
    row: 'px-6 py-3'
  },

  // Navigation padding
  navigation: {
    menuItem: 'px-3 py-2',
    menuItemLarge: 'px-4 py-3',
    submenu: 'pl-6 pr-3 py-2',
    breadcrumb: 'px-4 py-2'
  },

  // Modal and dialog padding
  modals: {
    container: 'p-6',
    header: 'px-6 py-4',
    content: 'px-6 py-4',
    footer: 'px-6 py-4',
    overlay: 'p-4'
  },

  // Dashboard specific padding
  dashboard: {
    kpiCard: 'p-6',
    chartContainer: 'p-6',
    statCard: 'p-4',
    widgetHeader: 'px-6 py-4',
    widgetContent: 'p-6'
  },

  // Spacing between elements
  spacing: {
    section: 'space-y-8',
    cardGroup: 'space-y-6',
    formGroup: 'space-y-4',
    buttonGroup: 'space-x-4',
    listItems: 'space-y-3',
    gridGap: 'gap-6',
    gridGapLarge: 'gap-8',
    gridGapSmall: 'gap-4'
  },

  // Responsive padding
  responsive: {
    container: 'px-4 sm:px-6 lg:px-8',
    section: 'py-8 sm:py-12 lg:py-16',
    card: 'p-4 sm:p-6 lg:p-8',
    modal: 'p-4 sm:p-6'
  },

  // Status-specific padding
  status: {
    success: 'p-4',
    warning: 'p-4',
    error: 'p-4',
    info: 'p-4'
  },

  // Animation and transition padding
  animations: {
    hover: 'hover:px-6 transition-all duration-200',
    focus: 'focus:px-4 transition-all duration-150',
    active: 'active:px-3 transition-all duration-100'
  }
};

// Utility functions for applying padding
export const getPadding = (component, variant = 'default') => {
  const config = adminPaddingConfig[component];
  return config ? config[variant] || config.default || '' : '';
};

// Combine multiple padding classes
export const combinePadding = (...paddingClasses) => {
  return paddingClasses.filter(Boolean).join(' ');
};

// Responsive padding helper
export const getResponsivePadding = (base, sm, lg) => {
  return `${base} sm:${sm} lg:${lg}`;
};

// Admin theme-specific padding configurations
export const adminThemePadding = {
  // Dark theme adjustments
  dark: {
    card: 'p-6 border border-gray-700',
    sidebar: 'p-6 bg-gray-900',
    header: 'px-6 py-4 bg-gray-800'
  },

  // Light theme (default)
  light: {
    card: 'p-6 bg-white',
    sidebar: 'p-6 bg-white',
    header: 'px-6 py-4 bg-white'
  }
};

// Component-specific padding presets
export const adminComponentPadding = {
  // Sidebar navigation
  sidebarNav: {
    container: 'p-4',
    section: 'py-4',
    item: 'px-3 py-2 mx-2',
    subItem: 'px-6 py-2 mx-2',
    divider: 'my-4'
  },

  // Dashboard widgets
  widgets: {
    kpi: 'p-6',
    chart: 'p-6',
    table: 'p-0', // Table handles its own padding
    list: 'p-4',
    metric: 'p-4'
  },

  // Forms and inputs
  adminForms: {
    container: 'p-6 space-y-6',
    section: 'space-y-4',
    fieldGroup: 'space-y-2',
    buttonGroup: 'pt-6 space-x-4',
    helpText: 'pt-2'
  },

  // Data tables
  dataTables: {
    wrapper: 'p-6',
    header: 'pb-4',
    filters: 'pb-4 space-y-4',
    pagination: 'pt-4',
    actions: 'px-6 py-3'
  },

  // Modals and overlays
  adminModals: {
    backdrop: 'p-4',
    container: 'p-6 max-w-2xl',
    header: 'pb-4',
    content: 'py-4',
    footer: 'pt-6 space-x-4'
  }
};

// Padding for different screen sizes
export const responsiveAdminPadding = {
  mobile: {
    container: 'px-4 py-6',
    card: 'p-4',
    modal: 'p-4'
  },
  tablet: {
    container: 'px-6 py-8',
    card: 'p-6',
    modal: 'p-6'
  },
  desktop: {
    container: 'px-8 py-12',
    card: 'p-8',
    modal: 'p-8'
  }
};

// Export default configuration
export default adminPaddingConfig;