export interface IBalanceRequest {
    agentId: string;
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
  }
  