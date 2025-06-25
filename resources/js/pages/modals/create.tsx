import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2, Search } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Employee',
        href: '/create/employee',
    },
];

export default function Employee() {

    const {data, setData, post, errors, processing} = useForm<{
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string
    }>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/employee');
        toast.success('Employee Created Successfully!');
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Employee" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className='rounded border p-6 shadow-xl'>
                    <div className='flex items-center justify-between mb-5'>
                        <div className="text-xl text-slate-600">
                            Create Employee
                        </div>

                        <Button>
                            <Link href='/employee' prefetch> Go Back</Link>
                        </Button>
                    </div>

                    <Card>
                        <CardContent>
                            <form onSubmit={handleFormSubmit}>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='col-span-2'>
                                        <Label htmlFor='firstName'>First Name</Label>
                                        <Input type='text' id='firstName' placeholder='First Name' value={data.firstName} onChange={e => setData('firstName', e.target.value)} aria-invalid={!!errors.firstName}/>
                                        <InputError message={errors.firstName}/>
                                    </div>
                                    <div className='col-span-2'>
                                        <Label htmlFor='lastName'>Last Name</Label>
                                        <Input type='text' id='lastName' placeholder='Last Name' value={data.lastName} onChange={e => setData('lastName', e.target.value)} aria-invalid={!!errors.lastName}/>
                                        <InputError message={errors.lastName}/>
                                    </div>
                                    <div className='col-span-2'>
                                        <Label htmlFor='email'>Email</Label>
                                        <Input type='email' id='email' placeholder='Email' value={data.email} onChange={e => setData('email', e.target.value)} aria-invalid={!!errors.email}/>
                                        <InputError message={errors.email}/>
                                    </div>
                                    <div className='col-span-2'>
                                        <Label htmlFor='phoneNumber'>Phone Number</Label>
                                        <Input type='text' id='phoneNumber' placeholder='Phone Number' value={data.phoneNumber} onChange={e => setData('phoneNumber', e.target.value)} aria-invalid={!!errors.phoneNumber}/>
                                        <InputError message={errors.phoneNumber}/>
                                    </div>

                                    
                                </div>
                                <div className='mt-4 text-end'>
                                    <Button type='submit' disabled={processing}>
                                        {processing && <Loader2 className='animate-spin'/>}
                                        <span>Create Employee</span>
                                        </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
