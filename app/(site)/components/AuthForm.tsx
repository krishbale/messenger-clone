'use client';
type Variant = 'LOGIN' | 'REGISTER'
import { BsGithub, BsGoogle  } from 'react-icons/bs';
import { useCallback, useState } from "react";
import {FieldValues,SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/Input";
import { signIn} from 'next-auth/react';
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";

import axios from 'axios';
import { toast } from 'react-hot-toast';
export const AuthForm = () => {
    const [variant , setVariant] = useState<Variant>('LOGIN');
    const [isloading,setIsLoading] = useState(false);
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
          axios.post('/api/register',data)
          .catch(() => toast('Something went wrong'))
          .finally(()=>setIsLoading(false))

        }
        if(variant === 'LOGIN'){

          signIn('credentials',{
            ...data,
            redirect:false

          }).then((callback) => {
            if(callback?.error){
              toast.error('Invalid credentials')
            }
            if(callback?.ok && !callback?.error){
              toast.success('Logged in!')

            }

          }).finally(()=>setIsLoading(false))
          
            //Next Auth Sign in

        }
       



    }
    const socialAction= (action:string)=>{
      setIsLoading(true);
      signIn(action,{
        redirect:false

      }).then((callback)=>{

        if(callback?.error){
          toast.error('Invalid Credentials');
        }
        if(callback?.ok &&!callback?.error){
          toast.success('Logged In')

        }
      })
      .finally(()=> setIsLoading(false));
      //Next Auth Social Sign In

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
                {variant === 'REGISTER' && (
            <Input
             label="name"
              errors={errors} 
              id='name' 
              register={register}
               />
               )}
                <Input
                 id='email' 
             label="Email Address"
              errors={errors} 
              type='email'
             
              register={register}
               />
                <Input
                 id='password' 
             label="Password"
              errors={errors} 
              type='password'
              register={register}
               />
               <Button
               disabled={isloading}
               fullWidth
               type="submit"
               >{variant ==='LOGIN' ? 'Sign in ':'Register'}</Button>
           
            </form>
            <div className="mt-6">
          <div className="relative">
            <div 
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
                        <div className="mt-6 flex gap-2">
            <AuthSocialButton
               onClick={() => socialAction('github')} 
              icon={BsGithub} 
             
            />
            <AuthSocialButton 
               onClick={() => socialAction('google')} 
              icon={BsGoogle} 
             
            />
          </div>
        </div>

   <div 
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
        >
          <div>
            {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'} 
          </div>
          <div 
            onClick={toggleVariant} 
            className="underline cursor-pointer"
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
                        
                        
                    </div>
                </div>
            
   
  )
}
