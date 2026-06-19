import { api } from "./axios";
import { ChangePasswordDto, LoginDto, RegisterDto, MarkNotificationDto } from "./types";

const USER_URL = "/user";
const TASK_URL = "/task";

export const ApiCollection = {
  // ================= AUTH =================

  // login: async (data: LoginDto) => {
  //   const response = await api.post(
  //     `${USER_URL}/login`,
  //     data
  //   );

  //   return response.data;
  // },

  login: async (data: LoginDto) => {
    // MOCK LOGIN
    if (
      data.email === "admin@gmail.com" &&
      data.password === "admin"
    ) {
      return {
        token: "dummy-token",
        user: {
          _id: "1",
          name: "Admin",
          email: "admin@gmail.com",
          role: "admin",
          isAdmin: true,
        },
      };
    }

    throw new Error("Invalid email or password");
  },

  register: async (data: RegisterDto) => {
    const response = await api.post(
      `${USER_URL}/register`,
      data
    );

    return response.data;
  },

  logout: async () => {
    const response = await api.post(
      `${USER_URL}/logout`
    );

    return response.data;
  },

  // ================= TASK =================

  getDashboardStats: async () => {
    const response = await api.get(
      `${TASK_URL}/dashboard`
    );

    return response.data;
  },

  getAllTask: async (
    strQuery: string,
    isTrashed: boolean,
    search: string
  ) => {
    const response = await api.get(
      `${TASK_URL}`,
      {
        params: {
          stage: strQuery,
          isTrashed,
          search,
        },
      }
    );

    return response.data;
  },

  createTask: async (data: unknown) => {
    const response = await api.post(
      `${TASK_URL}/create`,
      data
    );

    return response.data;
  },

  duplicateTask: async (id: string) => {
    const response = await api.post(
      `${TASK_URL}/duplicate/${id}`
    );

    return response.data;
  },

  updateTask: async (
    id: string,
    data: unknown
  ) => {
    const response = await api.put(
      `${TASK_URL}/update/${id}`,
      data
    );

    return response.data;
  },

  trashTask: async (id: string) => {
    const response = await api.put(
      `${TASK_URL}/${id}`
    );

    return response.data;
  },

  getSingleTask: async (id: string) => {
    const response = await api.get(
      `${TASK_URL}/${id}`
    );

    return response.data;
  },

  createSubTask: async (
    id: string,
    data: unknown
  ) => {
    const response = await api.put(
      `${TASK_URL}/create-subtask/${id}`,
      data
    );

    return response.data;
  },

  postTaskActivity: async (
    id: string,
    data: unknown
  ) => {
    const response = await api.post(
      `${TASK_URL}/activity/${id}`,
      data
    );

    return response.data;
  },

  deleteRestoreTask: async (
    id: string,
    actionType: string
  ) => {
    const response = await api.delete(
      `${TASK_URL}/delete-restore/${id}`,
      {
        params: {
          actionType,
        },
      }
    );

    return response.data;
  },

  // ================= USER =================

  updateUser: async (data: unknown) => {
    const response = await api.put(
      `${USER_URL}/profile`,
      data
    );

    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await api.delete(
      `${USER_URL}/${id}`
    );

    return response.data;
  },

  userAction: async (
    id: string,
    data: unknown
  ) => {
    const response = await api.put(
      `${USER_URL}/${id}`,
      data
    );

    return response.data;
  },

  getTeamList: async () => {
    const response = await api.get(
      `${USER_URL}/get-team`
    );

    return response.data;
  },

  getNotifications: async () => {
    const response = await api.get(
      `${USER_URL}/notifications`
    );

    return response.data;
  },

  markNotiAsRead: async (
    data: MarkNotificationDto
  ) => {
    const response = await api.put(
      `${USER_URL}/read-noti`,
      {},
      {
        params: {
          isReadType: data.type,
          id: data.id,
        },
      }
    );

    return response.data;
  },

  changePassword: async (
    data: ChangePasswordDto
  ) => {
    const response = await api.put(
      `${USER_URL}/change-password`,
      data
    );

    return response.data;
  },
};