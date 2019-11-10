export interface Role {
  _id: string;
  // sno: number;
  name: string;
  isActive: boolean;
  menus: {
    options: [{
      slug: {
        type: String
      },
      add: {
        type: Boolean
      },
      edit: {
        type: Boolean
      },
      link: {
        type: Boolean
      },
      delete: {
        type: Boolean
      }
    }]
  }
};