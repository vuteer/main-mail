// user container 
"use client"; 

import React from "react";
import { Plus } from "lucide-react"; 

import { Button } from "@/components/ui/button"; 
import TabContainer from "./tab-container"; 
import AddUserModal from "@/components/modals/add-user"; 
import UsersSheet from "@/components/sheets/add-users"; 
import UserSearch from "./user-search"; 
import UserUpdate from "./user-update"; 

import { useCustomEffect, useSearch } from "@/hooks";
import { UserTableType } from "@/types";
import { fetchUsers, UsersItems } from "./users"; 

const UsersContainer = ({domain}: {domain: string}) => {
    const [users, setUsers] = React.useState<UserTableType[]>([]);
    const [count, setCount] = React.useState<number>(0); 
    const [mounted, setMounted] = React.useState<boolean>(false); 

    const [loading, setLoading] = React.useState<boolean>(true); 
    const [openAddUserModal, setOpenAddUserModal] = React.useState<boolean>(false); 

    const searchParams = useSearch(); 
    const page = searchParams?.get("page") || "0"; 
    const q = searchParams?.get("q") || ""; 

    React.useEffect(() => setMounted(true), [])

    useCustomEffect(() => {
        if (!mounted) return; 
        setUsers([]); 
        fetchUsers(
            setUsers, setCount, setLoading, page, 40, domain, q
        )
    }, [page, q])

    return (
        <>
            <AddUserModal 
                setUsers={setUsers}
                users={users}
                onClose={() => setOpenAddUserModal(false)}
                isOpen={openAddUserModal}
                domain={domain}
                count={count}
                setCount={setCount}
                
            />
            <UserUpdate 
                users={users}
                setUsers={setUsers}
                count={count}
                setCount={setCount}
            />
            <TabContainer
                title="Domain Users"
                subtitle={`Total: ${loading ? "...": `${count} user${count === 1 ? "": "s"}`}`}
                headerComponent={
                    <div className="flex gap-1 items-center">
                         
                            <Button 
                                size="sm" 
                                className="gap-2 items-center rounded-full"
                                onClick={() => setOpenAddUserModal(true)}
                                variant="secondary"
                            >
                                <Plus size={18}/>
                            </Button>
                            <UsersSheet 
                                domain={domain}
                                fn={() => fetchUsers(
                                    setUsers, setCount, setLoading, page, 40, domain, q
                                )}
                            />
                         
                        <UserSearch />
                    </div>
                }
            >
                <UsersItems 
                    limit={40} 
                    users={users} 
                    setUsers={setUsers} 
                    loading={loading} 
                    setLoading={setLoading} 
                    count={count} 
                    setCount={setCount}
                    domain={domain}
                />
            </TabContainer>
        </>
    )
};

export default UsersContainer; 