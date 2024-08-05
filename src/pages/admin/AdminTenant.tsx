import AdminNav from "@/components/ui/AdminNav";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import url from "@/constant/url";
import Message from "@/constant/types/message";
const AdminTenant: React.FC = () => {
  const [allMsg, setMsg] = useState<Message[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axios.get(`${url}get-messages`);
      setMsg(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading && !Array.isArray(allMsg)) return <div>Loading...</div>;

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
                  if (!msg.user) {
                    return null; // Skip this item if msg.user is null or undefined
                  }
                  return (
                    <tr key={msg._id}>
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
