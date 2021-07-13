import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // },
  {
    path: '',
    loadChildren: () => import('./reseps/reseps.module').then(m => m.ResepsPageModule)
  },
  {
    path: 'reseps',
    loadChildren: () => import('./reseps/reseps.module').then( m => m.ResepsPageModule)
  },
  {
    path: 'add-resep',
    loadChildren: () => import('./add-resep/add-resep.module').then( m => m.AddResepPageModule)
  },
  {
    path: 'kategoris',
    loadChildren: () => import('./kategoris/kategoris.module').then( m => m.KategorisPageModule)
  },
  {
    path: 'add-kategori',
    loadChildren: () => import('./add-kategori/add-kategori.module').then( m => m.AddKategoriPageModule)
  },
  {
    path: 'localstorage',
    loadChildren: () => import('./localstorage/localstorage.module').then( m => m.LocalstoragePageModule)
  },
  // {
  //   path: 'image-upload',
  //   loadChildren: () => import('./image-upload/image-upload.module').then( m => m.ImageUploadPageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
