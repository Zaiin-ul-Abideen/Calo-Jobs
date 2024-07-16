export const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-orange-500';
      case 'resolved':
        return 'text-green-500';
      case 'failed':
        return 'text-red-500';
      default:
        return '';
    }
  };