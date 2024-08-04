import AdminNav from "@/components/ui/AdminNav";
import { useUserContext } from "@/Provider/UserContext";
import axios from "axios";
import url from "@/constant/url";
import { useEffect, useState } from "react";
import User from "@/constant/types/user";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Message {
  messages: [
    {
      isAdmin: boolean;
      userMsg: string;
      adminMsg: string;
    }
  ];
  _id: string;
  user: User;
}

const AdminTenant: React.FC = () => {
  const [allMsg, setMsg] = useState<Message[]>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    axios.get(`${url}get-messages`).then((response) => {
      const allMessage = response.data as Message[];

      setMsg(allMessage);
      setLoading(false);
    });
  }, [allMsg]);
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="h-screen w-screen flex">
        <AdminNav tenant />

        <div className="px-12 py-12">
          <h1 className="font-bold">Tenants</h1>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th>Name</th>
                  <th>Email</th>

                  <th>Verified</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {allMsg.map((msg) => {
                  return (
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={`${msg.user.avatar}`}
                                alt="Profile picture"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{msg.user.fullName}</div>
                            <div className="text-sm opacity-50">
                              {msg.user.address}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {msg.user.email}
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          Tenant
                        </span>
                      </td>

                      <td>{msg.user.verified ? "True" : "False"}</td>

                      <th>
                        <Link to={`/admin/chats/${msg._id}`}>
                          <button className="btn btn-ghost btn-xs">
                            Message
                          </button>
                        </Link>

                        <Button className="ml-12 bg-red-500">Delete</Button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
              {/* foot */}
              <tfoot>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>

                  <th>Verified</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTenant;
