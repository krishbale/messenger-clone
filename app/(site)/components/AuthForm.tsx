'use client';
type Variant = 'LOGIN' | 'REGISTER'
import { useCallback, useState } from "react";
import {FieldValues,SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/Input";
export const AuthForm = () => {
    const [variant , setVariant] = useState<Variant>('LOGIN');
    const [isloading,setIsLoading] = useState(true);
    const toggleVariant = useCallback(()=>{
        if(variant ==='LOGIN'){
            setVariant('REGISTER');
        }else {
            setVariant('LOGIN');
        }
    },[variant]);
    const {
        register,handleSubmit,formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            password:''

        }
    })
    const onSubmit:SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true);
        if(variant ==='REGISTER'){
            //Axios Register

        }
        if(variant === 'LOGIN'){
            //Next Auth Sign in

        }
        const socialAction= (action:string)=>{
            setIsLoading(true);
            //Next Auth Social Sign In

        }



    }
  return (
    <div className="
    mt-8
    sm:mx-auto
    sm:w-full
    sm:max-w-md


    ">
        <div className="
        bg-white
        px-4
        py-8
        shadow
        sm:rounded-lg
        sm:px-10
        ">
            <form className="
            space-y-6
            "
            onSubmit={handleSubmit(onSubmit)} >
            <Input />
            </form>
        </div>
    </div>
  )
}
