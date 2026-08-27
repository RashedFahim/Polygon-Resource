import { getEmailStatus } from './contact.js';

export default function handler(_req, res) {
  res.status(200).json(getEmailStatus());
}
