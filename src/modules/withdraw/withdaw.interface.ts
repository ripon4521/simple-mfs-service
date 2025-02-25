export interface IWithdraw {
    agentId: string;
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
  }
  