import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Employee',
        href: '/employee',
    },
];

interface EmployeeType {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
}

export default function Employee({employees}: {employees: EmployeeType[]}) {

    const {flash} = usePage<{flash: {message?: string}}>().props;
    console.log(employees);
    useEffect(() => {
        if(flash.message){
            toast.success(flash.message);
        }
    }, [flash.message]);

    const deleteEmployee = async (id: number) => {
        if(confirm('Are you sure you want to delete this employee?')){
            router.delete(`/employee/${id}`);
            toast.success('Employee Deleted Successfully!');
        }
    }

    return ( 
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employee" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className='rounded border p-6 shadow-xl'>
                    <div className='flex items-center justify-between mb-5'>
                        <div className="relative w-full sm:w-1/3">
                            <Input id={'search'} className="peer ps-9" placeholder="Search..." type="search" />
                            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                            <Search size={16} aria-hidden="true" />
                            </div>
                        </div>

                        <Button>
                            <Link href='/employee/create' prefetch> Create Employee</Link>
                        </Button>
                    </div>

                    <Card>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>#</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Phone Number</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {/* <TableRow>
                                        <TableHead>1</TableHead>
                                        <TableHead>Earl Kian</TableHead>
                                        <TableHead>earlkian8@gmail.com</TableHead>
                                        <TableHead>9774925594</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow> */}

                                    {employees.data?.map((employee, index) => (
                                        <TableRow>
                                            <TableCell>{employee.id}</TableCell>
                                            <TableCell>{employee.first_name + " " + employee.last_name}</TableCell>
                                            <TableCell>{employee.email}</TableCell>
                                            <TableCell>{employee.phone_number}</TableCell>
                                            <TableCell className='space-x-1'>
                                                <Button asChild size={'sm'}>
                                                    <Link href={`/employee/${employee.id}/edit`}>Edit</Link>
                                                </Button>
                                                <Button size={'sm'} variant={'destructive'} onClick={() => deleteEmployee(employee.id)}>
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))};
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
