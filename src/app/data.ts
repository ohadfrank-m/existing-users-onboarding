export const PERSONA = {
  name: 'Rachel Cohen',
  firstName: 'Rachel',
  role: 'HR Director',
  company: 'Novella',
  companySize: '~200 employees',
  teamMembers: [
    { initials: 'RC', color: '#9D50DD', name: 'Rachel Cohen' },
    { initials: 'TM', color: '#579BFC', name: 'Tal Mizrahi' },
    { initials: 'NG', color: '#FF642E', name: 'Noa Goldstein' },
    { initials: 'DS', color: '#00C875', name: 'Dan Shapiro' },
  ],
};

export interface CandidateRow {
  id: number;
  name: string;
  role: string;
  assignee: string;
  status: string;
  statusColor: string;
  priority: string;
  priorityColor: string;
  dueDate: string;
  overdue?: boolean;
  source: string;
}

export const RECRUITMENT_DATA: {
  group: string;
  groupColor: string;
  rows: CandidateRow[];
}[] = [
  {
    group: 'New applications',
    groupColor: '#579BFC',
    rows: [
      { id: 1, name: 'Maya Ben-Ari', role: 'Senior Product Designer', assignee: '', status: 'New', statusColor: '#C4C4C4', priority: '', priorityColor: '', dueDate: 'Apr 10', overdue: true, source: 'LinkedIn' },
      { id: 2, name: 'Liam Foster', role: 'Frontend Developer', assignee: '', status: 'New', statusColor: '#C4C4C4', priority: '', priorityColor: '', dueDate: 'Apr 11', overdue: true, source: 'Referral' },
      { id: 3, name: 'Priya Kapoor', role: 'Data Analyst', assignee: '', status: 'New', statusColor: '#C4C4C4', priority: '', priorityColor: '', dueDate: 'Apr 12', overdue: true, source: 'Indeed' },
      { id: 4, name: 'James O\'Connor', role: 'DevOps Engineer', assignee: '', status: 'New', statusColor: '#C4C4C4', priority: '', priorityColor: '', dueDate: 'Apr 14', source: 'Website' },
      { id: 5, name: 'Sarah Kim', role: 'Marketing Manager', assignee: '', status: 'New', statusColor: '#C4C4C4', priority: '', priorityColor: '', dueDate: 'Apr 15', source: 'LinkedIn' },
      { id: 6, name: 'Alex Petrov', role: 'Backend Developer', assignee: '', status: 'New', statusColor: '#C4C4C4', priority: '', priorityColor: '', dueDate: 'Apr 16', source: 'Referral' },
      { id: 7, name: 'Emma Wilson', role: 'UX Researcher', assignee: '', status: 'New', statusColor: '#C4C4C4', priority: '', priorityColor: '', dueDate: 'Apr 17', source: 'LinkedIn' },
      { id: 8, name: 'Omar Hassan', role: 'Product Manager', assignee: '', status: 'New', statusColor: '#C4C4C4', priority: '', priorityColor: '', dueDate: 'Apr 17', source: 'Indeed' },
    ],
  },
  {
    group: 'Screening',
    groupColor: '#FDAB3D',
    rows: [
      { id: 9, name: 'Chen Wei', role: 'Senior Developer', assignee: 'Tal Mizrahi', status: 'Phone Screen', statusColor: '#579BFC', priority: 'High', priorityColor: '#E2445C', dueDate: 'Apr 8', overdue: true, source: 'Referral' },
      { id: 10, name: 'Anna Kowalski', role: 'Product Designer', assignee: 'Noa Goldstein', status: 'Phone Screen', statusColor: '#579BFC', priority: 'Medium', priorityColor: '#FDAB3D', dueDate: 'Apr 9', overdue: true, source: 'LinkedIn' },
      { id: 11, name: 'Marcus Johnson', role: 'Data Engineer', assignee: '', status: 'Resume Review', statusColor: '#579BFC', priority: '', priorityColor: '', dueDate: 'Apr 12', overdue: true, source: 'Website' },
      { id: 12, name: 'Yuki Tanaka', role: 'QA Lead', assignee: '', status: 'Resume Review', statusColor: '#579BFC', priority: '', priorityColor: '', dueDate: 'Apr 15', source: 'Indeed' },
    ],
  },
  {
    group: 'Interviews',
    groupColor: '#00C875',
    rows: [
      { id: 13, name: 'David Park', role: 'Engineering Manager', assignee: 'Rachel Cohen', status: 'Interview Scheduled', statusColor: '#00C875', priority: 'Critical', priorityColor: '#333333', dueDate: 'Apr 18', source: 'Referral' },
      { id: 14, name: 'Sofia Rodriguez', role: 'Senior Designer', assignee: 'Noa Goldstein', status: 'Interview Scheduled', statusColor: '#00C875', priority: 'High', priorityColor: '#E2445C', dueDate: 'Apr 19', source: 'LinkedIn' },
      { id: 15, name: 'Tom Chen', role: 'Full Stack Developer', assignee: 'Tal Mizrahi', status: 'Interview Scheduled', statusColor: '#00C875', priority: 'High', priorityColor: '#E2445C', dueDate: 'Apr 20', source: 'Referral' },
    ],
  },
  {
    group: 'Offer stage',
    groupColor: '#E2445C',
    rows: [
      { id: 16, name: 'Elena Petrova', role: 'Head of Marketing', assignee: 'Rachel Cohen', status: 'Offer Extended', statusColor: '#FDAB3D', priority: 'Critical', priorityColor: '#333333', dueDate: 'Apr 8', overdue: true, source: 'Headhunter' },
      { id: 17, name: 'Daniel Kim', role: 'Backend Lead', assignee: 'Rachel Cohen', status: 'Offer Extended', statusColor: '#FDAB3D', priority: 'Critical', priorityColor: '#333333', dueDate: 'Apr 9', overdue: true, source: 'Referral' },
    ],
  },
];

export const SIDEBAR_BOARDS = [
  { name: 'Recruitment Pipeline', icon: 'board', active: true },
  { name: 'Employee Onboarding', icon: 'board', active: false },
  { name: 'Team Directory', icon: 'board', active: false },
  { name: 'Benefits Tracker', icon: 'board', active: false },
  { name: 'Performance Reviews', icon: 'doc', active: false },
];

export const PAIN_SIGNALS = {
  overdueItems: 7,
  unassignedCandidates: 10,
  missingPriority: 10,
  stuckInScreening: 4,
  pendingOffers: 2,
};
