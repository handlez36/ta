import { HttpAdapter } from 'js-data-http';

export class User {

    constructor(
        public id: number,
        public username: string,
        public avatarUrl?: string)
    {

    }

    static access_key() {
        return "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9VSXhSVEUzT0VNME5VRTRNRGswUlRJeVFqSTRNME0wTWtReFFqTkNRakZCT0RFeVFUQkJNQSJ9.eyJpc3MiOiJodHRwczovL3RhZy1hbG9uZy5hdXRoMC5jb20vIiwic3ViIjoibktyekJ3dHpzWTA3SjllcVlobWV1WGdIaFhPY2txMnRAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vdGFnLWFsb25nLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTEyOTEyNzE5LCJleHAiOjE1MTI5OTkxMTksInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.okG2XoXGtcWzwNhPqXVkfz9fWTxHCfb0Fu2-ePCWsKM7_8gUZ9jvOOoRONzPwa3wAi28UyIGLmnai73OL889NswY3qaZtjasVO26u0Xdy0HtdHmEIS7qZn23AkDbSkncpifWXS3dgzarlGpXdDTms2iPglJrz5VjUmb_N2Zo-L1P1nAxhwcr3HZBASVN0bfbOYq_-XT2pK3YGPnlr8hn8a8OjCW2bisjpNk0c5QLh0yvN-eESjucXoXOXLLtsDibMpPDlRMLfi2wOI8m7TEwbfM_yqhecm6HE3gmihEWCoOsq6WKxtOWn9ypcDlrgaKgeQVSl-QxvAMfMJDSyz9h4A";
    }

    static mapperOptions() {
        return {
            endpoint: 'users',
            idAttribute: 'user_id',
            validateOnSet: false,
            schema: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    nickname: { type: 'string' },
                    picture: { type: 'string' },
                    user_id: { type: 'string' },
                    email: { type: 'string' }
                }
            },
            relations: {
                hasMany: {
                    journey: {
                        foreignKey: 'user_id',
                        localField: 'journies'
                    }
                }
            }
        }
    }
}