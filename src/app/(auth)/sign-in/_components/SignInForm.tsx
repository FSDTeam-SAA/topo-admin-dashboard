'use client'
import { loginAction } from '@/actions/auth/login'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginformSchema, LoginFormValues } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import AuthHeader from './AUthHeader'

export default function SignInForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginformSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Form submission handler
  async function onSubmit(values: LoginFormValues) {
    startTransition(() => {
      loginAction(values).then((res) => {
        console.log(res)
        if (!res.success) {
          toast.error(res.message || 'Login failed. Please try again.')
          return
        }

        router.push('/')
        toast.success(res.message || 'Login successful')
      })
    })
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center font-sans">
      <AuthHeader
        title1="Welcome"
        title2="Back"
        desc="Please enter your credentials to continue"
      />

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full py-6 md:py-7 lg:py-8 px-4 md:px-5 lg:px-6"
        >
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 text-[#999999]" />
                    </div>
                    <Input
                      placeholder="Enter your email"
                      className="font-poppins w-full md:w-[400px] h-[40px] bg-white border border-black text-base placeholder:text-base placeholder:text-[#999999] placeholder:leading-[120%] placeholder:font-normal pl-[42px] pr-4 py-[15px] rounded-[8px]"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs mt-1" />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <div className="mt-6 mb-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your Password"
                        className="font-poppins w-full md:w-[400px] h-[40px] bg-white border border-black text-base placeholder:text-base placeholder:text-[#999999] placeholder:leading-[120%] placeholder:font-normal pl-[42px] pr-4 py-[15px] rounded-[8px]"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs mt-1" />
                </FormItem>
              )}
            />
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            className="font-poppins h-[40px] w-full bg-black text-lg font-semibold leading-[120%] tracking-[0%] rounded-[8px] text-[#F4F4F4] py-[15px]"
            disabled={isPending}
          >
            {isPending ? 'Signing In...' : 'Sign In'}
          </Button>

          {/* Sign Up Link */}
          {/* <div className="text-center text-sm mt-4 md:mt-5 lg:mt-6">
            <span className="font-poppins text-[#891D33] text-xs font-normal leading-[120%] tracking-[0%]">
              New To our Platform?
            </span>{" "}
            <Link
              href="/signup"
              className="font-poppins text-black text-xs leading-[120%] font-medium hover:underline"
            >
              Sign Up Here
            </Link>
          </div> */}
        </form>
      </Form>
    </div>
  )
}
