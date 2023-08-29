export interface activity {
  _id: any;
  acquit: boolean;
  type: string;
  title: string;
  level: string;
  activityDate: Date;
  dateCreated: Date;
  creator: string;
  description: string;
  department: string;
  employee: Array<{}>;
  site: string;
  system: string;
  activityType: string;
  acquitHelp: Array<''>
}