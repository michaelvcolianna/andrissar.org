@extends('layouts.app')

@section('content')
    <div id="auth">
        @if($errors->any())
            <aside class="errors">
                @foreach($errors->all() as $error)
                    <p>
                        {{ $error }}
                    </p>
                @endforeach
            </aside>
        @endif

        <form action="{{ route('password.update') }}" method="post">
            @csrf
            <input name="token" type="hidden" value="{{ $token }}">

            <fieldset class="form-text">
                <label for="email">E-mail address</label>
                <input id="email" name="email" type="email" value="{{ $email ?? old('email') }}" autofocus required autocorrect="off" autocapitalize="off" autocomplete="email" spellcheck="false">
            </fieldset>

            <fieldset class="form-text">
                <label for="password">Password</label>
                <input id="password" name="password" type="password" required autocomplete="new-password">
            </fieldset>

            <fieldset class="form-text">
                <label for="password-confirm">Confirm password</label>
                <input id="password-confirm" name="password_confirmation" type="password" required autocomplete="new-password">
            </fieldset>

            <button type="submit">Reset password</button>
        </form>

        <aside>
            @if(Route::has('register'))
                {{-- <a href="{{ route('register') }}">Create an account</a> --}}
            @endif

            <a href="{{ route('login') }}">Login</a>
        </aside>
    </div>
@endsection
