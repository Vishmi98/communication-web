"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaBoxOpen, FaSignOutAlt } from 'react-icons/fa';

import CommonButton from '@/components/CommonButton';
import userStore from '@/store/userStore';
import { UserDataType } from '@/modules/profile/profile.types';
import { getUserProfileData } from '@/modules/profile/profile.service';
import { handleCleanCookie } from '@/utils/cookie.util';
import ProfileSkeleton from '@/modules/profile/ui/ProfileSkeleton';
import { OrderDataType } from '@/modules/cart/cart.types';
import { getOrderByUserId } from '@/modules/cart/cart.service';
import OrderCard from '@/modules/profile/ui/OrderCard';


const ProfilePage = () => {
  const { removeUser } = userStore();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('personal');
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<OrderDataType[]>([]);

  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: FaUser },
    { id: 'orders', label: 'My Orders', icon: FaBoxOpen },
    // { id: 'addresses', label: 'Addresses', icon: FaMapMarkerAlt },
    // { id: 'settings', label: 'Settings', icon: FaCog },
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);

        // Fetch Profile
        const profileRes = await getUserProfileData();

        if (profileRes.success && profileRes.user) {
          setUserData(profileRes.user);

          // Fetch Orders using customerId
          const ordersRes = await getOrderByUserId({
            customerId: profileRes.user.id,
          });

          if (ordersRes.success) {
            setOrders(ordersRes.orders || []);
          }
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error("Data fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [router]);

  const handleLogOut = () => {
    handleCleanCookie();
    removeUser(); // Clear Zustand store
    window.location.href = '/';
  }

  // Skeleton Component
  if (isLoading) return <ProfileSkeleton />;

  return (
    <div className="min-h-screen border-t-2 border-primary w-[95%] mx-auto py-10 mt-5 md:mt-0">
      {/* Header section */}
      <div className="mb-8">
        <h1 className="md:text-3xl text-xl font-bold">My Profile</h1>
        <p className="text-gray-500 mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">

        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6 flex flex-col items-center">
            <div className="relative w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-4 flex items-center justify-center">
              <FaUser className="text-5xl text-gray-400" />
            </div>
            <h2 className="text-xl font-bold">{userData?.firstName} {userData?.lastName}</h2>
            <p className="text-gray-500 text-sm">{userData?.email}</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <ul className="flex flex-col">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-colors ${activeTab === tab.id
                      ? 'bg-primary/10 text-primary font-semibold border-l-4 border-primary'
                      : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                      }`}
                  >
                    <tab.icon className={activeTab === tab.id ? 'text-primary' : 'text-gray-400'} size={20} />
                    {tab.label}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={handleLogOut} className="w-full flex items-center gap-3 px-6 py-4 text-left text-red-500 hover:bg-red-50 transition-colors border-l-4 border-transparent border-t border-gray-100">
                  <FaSignOutAlt size={20} />
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 h-full">

            {activeTab === 'personal' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="md:text-xl text-lg font-bold mb-6 border-b pb-2">Personal Information</h3>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">First Name</label>
                      <input type="text" defaultValue={userData?.firstName} className="w-full px-4 py-2 rounded-md border border-gray-200 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Last Name</label>
                      <input type="text" defaultValue={userData?.lastName} className="w-full px-4 py-2 rounded-md border border-gray-200 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email Address</label>
                      <input type="email" defaultValue={userData?.email} className="w-full px-4 py-2 rounded-md border border-gray-200 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone Number</label>
                      <input type="tel" defaultValue={userData?.phone} className="w-full px-4 py-2 rounded-md border border-gray-200 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
                    </div>
                  </div>

                  <div className="pt-2 w-full md:w-fit">
                    <CommonButton title='Save Changes' onPress={() => { }} />
                  </div>
                </form>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="md:text-xl text-lg font-bold mb-6 border-b pb-2">
                  My Orders
                </h3>

                {orders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <FaBoxOpen className="text-4xl text-gray-400" />
                    </div>

                    <h4 className="text-lg font-semibold">No orders yet</h4>

                    <p className="text-gray-500 mt-2 mb-6">
                      Looks like you haven't made any purchases yet.
                    </p>

                    <div className="pt-2 w-full md:w-fit">
                      <CommonButton
                        title="Start Shopping"
                        onPress={() => router.push("/")}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {orders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* {activeTab === 'addresses' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <h3 className="md:text-xl text-lg font-bold">Saved Addresses</h3>
                  <button className="text-primary font-semibold hover:underline">Add New</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border-2 border-primary rounded-xl p-6 relative">
                    <span className="absolute top-4 right-4 bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">Default</span>
                    <h4 className="font-bold mb-2">Home</h4>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      John Doe<br />
                      123 Main Street, Apt 4B<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                    <div className="flex gap-4 text-sm font-medium">
                      <button className="text-primary hover:underline">Edit</button>
                      <button className="text-red-500 hover:underline">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-2xl font-bold mb-6 border-b pb-4">Account Settings</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b">
                    <div>
                      <h4 className="font-semibold">Email Notifications</h4>
                      <p className="text-sm text-gray-500">Receive emails about new products and promotions.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b">
                    <div>
                      <h4 className="font-semibold">Order Updates</h4>
                      <p className="text-sm text-gray-500">Receive SMS notifications about your order status.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            )} */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
