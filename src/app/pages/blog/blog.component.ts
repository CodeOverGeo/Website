import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { VisibilityDirective } from '../../directives/visibility.directive';

export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  published_timestamp: string;
  tag_list: string[];
  positive_reactions_count: number;
  comments_count: number;
  reading_time_minutes: number;
  cover_image: string | null;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [DatePipe, VisibilityDirective],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {
  readonly articlesResource = httpResource<DevToArticle[]>(
    () => 'https://dev.to/api/articles?username=giovanni_rufinogeo_77b',
    { defaultValue: [] }
  );
}
