export interface Student {
  _id?: string;  // Add this with the question mark (optional)
  id: any;       // Keep this for your frontend logic
  name: string;
  email: string;
  course: string;
  status: string;
}