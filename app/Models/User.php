<?php

namespace App\Models;

use Bootstrapper\Interfaces\TableInterface;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Notifications\UserCreated;

class User extends Authenticatable implements TableInterface
{
    use Notifiable;
    const ROLE_ADMIN = 1;
    const ROLE_TEACHER = 2;
    const ROLE_STUDENT = 3;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'enrolment'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function profile()
    {
        return $this->hasOne(UserProfile::class)->withDefault();
    }

    public function userable()
    {
        return $this->morphTo();
    }

    public static function createFully($data){
        $password = str_random(7);
        $data['password'] = $password;
        /** @var User $user */
        $user = parent::create($data+['enrolment' => str_random(7)]);
        self::assignEnrolment($user, self::ROLE_ADMIN);
        self::assingRole($user, $data['type']);
        $user->save();
        if(isset($data['send_mail'])){
            $token = \Password::broker()->createToken($user);
            $user->notify(new UserCreated($token));
        }
        return compact('user', 'password');
    }

    public static function assignEnrolment(User $user, $type){
        $types = [
            self::ROLE_ADMIN => 100000,
            self::ROLE_TEACHER => 400000,
            self::ROLE_STUDENT => 700000,
        ];
        $user->enrolment = $types[$type] + $user->id;
        return $user->enrolment;
    }

    public static function assingRole(User $user, $type){
        $types = [
            self::ROLE_ADMIN => Admin::class,
            self::ROLE_TEACHER => Teacher::class,
            self::ROLE_STUDENT => Student::class,
        ];

        $model = $types[$type];
        $model = $model::create([]);
        $user->userable()->associate($model);
    }

    public function getTableHeaders()
    {
        return ['ID', 'Nome', 'E-mail'];
    }

    public function getValueForHeader($header)
    {
        switch ($header){
            case 'ID':
                return $this->id;
            case 'Nome':
                return $this->name;
            case 'E-mail':
                return $this->email;
        }
    }
}
